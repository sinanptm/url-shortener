import { Inject, Injectable } from '@nestjs/common';
import { Link, LinkDocument } from './link.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLinkDto } from './dto/create-link.dto';

@Injectable()
export class LinkService {
    constructor(
        @InjectModel(Link.name) private linkModel: Model<LinkDocument>,
        @Inject("NANOID") private nanoId: () => string
    ) { }

    async createLink(link: CreateLinkDto): Promise<LinkDocument> {
        const shortLink = await this.createShortLink();
        return await this.linkModel.create({ ...link, shortLink });
    }

    private async createShortLink(): Promise<string> {
        let shortLink: string;
        let isUnique = false;

        while (!isUnique) {
            const nanoId = this.nanoId();
            shortLink = `${process.env.CLIENT_URL}/${nanoId}`;
            const existingLink = await this.linkModel.findOne({ shortLink });
            if (!existingLink) {
                isUnique = true;
            }
        }

        return shortLink;
    }

    async findByShortLink(shortLink: string): Promise<LinkDocument | null> {
        const link = await this.linkModel.findOne({ shortLink });
        
        if (link) {
            await this.linkModel.findByIdAndUpdate(link._id, { $inc: { click: 1 } });
            return link;
        }
        return null;
    }
}
