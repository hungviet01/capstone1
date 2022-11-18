import { Component } from "@angular/core";

@Component({
    selector: 'app-slide-show',
    templateUrl: './slide-show.component.html',
    styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent {

    public currentImage: string;

    public images: string[] = [
        'https://thegioithethao.vn/images/products_soccer/2021/01/28/small/san-bong-minh-kiet-duong-noi-anh6_1611823656.jpg',
        'https://thegioithethao.vn/images/products_soccer/2022/01/15/small/mk_1642245562.jpg',
        'https://thegioithethao.vn/images/products_soccer/2022/01/15/small/mk-2_1642245566.jpg',
        'https://thegioithethao.vn/images/products_soccer/2022/01/15/small/mk-2_1642245570.jpg'
    ]

    constructor() {
        this.currentImage = this.images[0];
    }
}