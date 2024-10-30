import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  async getAllTransactions(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<Pagination<Transaction>> {
    try {
      return await this.transactionService.paginate({ page, limit });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  async addTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      return await this.transactionService.addTransaction(createTransactionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  async getTransactionById(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.transactionService.getTransactionById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}