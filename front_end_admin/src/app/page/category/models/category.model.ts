import { ResponseServiceModel } from "src/app/base/core/models/search.model";

export interface CategoryModel {
    id?: number;
    name: string;
}

export interface ResponseSearchCategory extends ResponseServiceModel<CategoryModel> {

}