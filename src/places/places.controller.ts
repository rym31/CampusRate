import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus, Res, Query } from '@nestjs/common';
import type { Response } from 'express';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';

@Controller('/v1/places')
export class PlacesController {
    constructor( private placesService: PlacesService) {}

    @Get()
    async findAll(
        @Query("category") category?: string,
        @Query("page") page?: string,
        @Query("limit") limit?: string,
    ) {
        return this.placesService.findAll(category, page, limit);
    }

    @Post()
    async create(@Body() body: CreatePlaceDto, @Res() res:Response) {
        const newPlace = await this.placesService.create(body);
        res.setHeader("Location", `/v1/places/${newPlace.id}`);
        res.status(HttpStatus.CREATED).json(newPlace);
    }

    @Get(":id")
    async findOne(@Param("id") id: string) {
        return this.placesService.findOne(id);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() body: any) {
        return this.placesService.update(id, body);
    }

    @Delete(":id")
    async remove(@Param("id") id: string) {
        return this.placesService.remove(id);
    }
}
