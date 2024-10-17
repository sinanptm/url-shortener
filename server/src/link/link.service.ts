import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Link, LinkDocument } from './link.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateLinkDto } from './dto/create-link.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LinkService {
    constructor(
        @InjectModel(Link.name) private linkModel: Model<LinkDocument>,
        @Inject("NANOID") private nanoId: () => string,
        private userService: UsersService
    ) { }

    async createLink({ orgLink, userId }: CreateLinkDto): Promise<LinkDocument> {
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new NotFoundException();
        }
        const shortLink = await this.createShortLink();

        return await this.linkModel.create({ orgLink, userId, shortLink });
    }

    async clickLink(id: string): Promise<string> {
        const link = await this.linkModel.findByIdAndUpdate(id, { $inc: { click: 1 } });
        if (link) {
            return link.orgLink;
        }
    }

    async getUserLinks(userId: string): Promise<LinkDocument[]> {
        return await this.linkModel.find({ userId });
    }

    async deleteLink(id:string){
        await this.linkModel.findByIdAndDelete(id);
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
}
