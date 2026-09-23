import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { ProblemDetailsDto } from '../common/dto/problem-details.dto';

@ApiTags('Places')
@Controller('/v1/places')
export class PlacesController {
  constructor(private placesService: PlacesService) {}

  @Get()
  @ApiOperation({ summary: 'Lister les endroits' })
  @ApiOkResponse({ description: 'Liste des endroits' })
  async findAll(
    @Query('category') category?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.placesService.findAll(category, page, limit);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un endroit' })
  @ApiCreatedResponse({ description: 'Endroit créé' })
  @ApiBadRequestResponse({
    description: 'Données invalides',
    type: ProblemDetailsDto,
  })
  async create(@Body() body: CreatePlaceDto, @Res() res: Response) {
    const newPlace = await this.placesService.create(body);
    res.setHeader('Location', `/v1/places/${newPlace.id}`);
    res.status(HttpStatus.CREATED).json(newPlace);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consulter un endroit' })
  @ApiParam({ name: 'id', description: "Identifiant de l'endroit" })
  @ApiOkResponse({ description: 'Endroit trouvé' })
  @ApiNotFoundResponse({
    description: 'Endroit introuvable',
    type: ProblemDetailsDto,
  })
  async findOne(@Param('id') id: string) {
    return this.placesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier partiellement un endroit' })
  @ApiParam({ name: 'id', description: "Identifiant de l'endroit" })
  @ApiOkResponse({ description: 'Endroit modifié' })
  @ApiBadRequestResponse({
    description: 'Données invalides',
    type: ProblemDetailsDto,
  })
  @ApiNotFoundResponse({
    description: 'Endroit introuvable.',
    type: ProblemDetailsDto,
  })
  async update(@Param('id') id: string, @Body() body: any) {
    return this.placesService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un endroit' })
  @ApiParam({ name: 'id', description: "Identifiant de l'endroit" })
  @ApiNoContentResponse({ description: 'Endroit supprimé' })
  @ApiNotFoundResponse({
    description: 'Endroit introuvable',
    type: ProblemDetailsDto,
  })
  @ApiConflictResponse({
    description: 'Endroit possède des appréciations existantes',
    type: ProblemDetailsDto,
  })
  async remove(@Param('id') id: string) {
    return this.placesService.remove(id);
  }
}
