import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

import {
  Type,
} from 'class-transformer';

export class BulkInventoryCountItemRequestDto {
  @IsUUID()
  stockId!: string;

  @IsNumber({
    maxDecimalPlaces: 3,
  })
  @Min(0)
  cantidadContada!: number;
}

export class BulkInventoryCountRequestDto {
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({
    each: true,
  })
  @Type(
    () =>
      BulkInventoryCountItemRequestDto,
  )
  items!: BulkInventoryCountItemRequestDto[];
}