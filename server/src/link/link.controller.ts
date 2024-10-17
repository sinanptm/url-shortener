import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { LinkService } from './link.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('link')
export class LinkController {
    constructor(private linkService: LinkService) { }

    @Post()
    async create(@Body() { orgLink }: { orgLink: string; }, @Request() req) {
        return this.linkService.createLink({ orgLink, userId: req.user._id });
    }

    @Patch()
    async getLink(@Body() { id }: { id: string; }) {
        const orgLink = await this.linkService.clickLink(id);
        if (orgLink) {
            return orgLink;
        } else {
            throw new NotFoundException("Link Not found");
        }
    }

    @Get('/')
    async getLinks(@Request() req) {
        const userId = req.user._id;
        return this.linkService.getUserLinks(userId);
    }

    @Delete('/:id')
    async deleteLink(@Param('id') id: string) {
        this.linkService.deleteLink(id);
    }
}
