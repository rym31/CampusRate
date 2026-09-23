import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('v1')
export class ReviewsController {
    constructor(private reviewsService: ReviewsService) {}

    @Post('places/:placeId/reviews')
    @HttpCode(HttpStatus.CREATED)
    async create(@Param('placeId') placeId: string, @Body() body: CreateReviewDto) {
        return this.reviewsService.create(placeId, body);
    }

    @Get('places/:placeId/reviews')
    async findAllByPlace(@Param('placeId') placeId: string) {
        return this.reviewsService.findAllByPlace(placeId);
    }

    @Get('reviews/:id')
    async findOne(@Param('id') id: string) {
        return this.reviewsService.findOne(id);
    }

    @Patch('reviews/:id')
    async update(@Param('id') id: string, @Body() body: Partial<CreateReviewDto>) {
        return this.reviewsService.update(id, body);
    }

    @Delete('reviews/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string) {
        return this.reviewsService.remove(id);
    }
}
