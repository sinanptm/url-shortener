import { Body, Controller, Get, NotFoundException, Param, Post, Request, Response, UseGuards } from '@nestjs/common';
import { LinkService } from './link.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('link')
export class LinkController {
    constructor(private linkService: LinkService) { }

    @UseGuards(AuthGuard)
    @Post()
    async create(@Body() { orgLink }: { orgLink: string; }, @Request() req) {
        return this.linkService.createLink({ orgLink, userId: req.user._id });
    }

    @Get("/:shortLink")
    async getLink(@Param("shortLink") shortLink: string, @Response() res) {
        const link = await this.linkService.findByShortLink(shortLink);
        if (link) {
            return res.redirect(link.orgLink);
        };
        throw new NotFoundException("Link Not found");
    }
}
