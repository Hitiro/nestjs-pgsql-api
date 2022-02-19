import { BaseQueryParametersDto } from "./base-query-parameters.dto";

export class FindUserQueryDto extends BaseQueryParametersDto {
    name: string;
    email: string;
    status: boolean;
    role: string;
}