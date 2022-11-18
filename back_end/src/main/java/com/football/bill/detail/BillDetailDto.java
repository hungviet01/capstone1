package com.football.bill.detail;

import com.football.category.Category;
import com.football.product.Product;
import com.football.size.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * A DTO for the {@link BillDetail} entity
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillDetailDto implements Serializable {
    private Long id;
    private String billId;
    private String productId;
    private String productName;
    private String categoryName;
    private BigDecimal price;
    private Long quantity;
    private Long sizeId;
    private String sizeName;
    private BigDecimal total;

    public BillDetailDto(BillDetail billDetail, Product product, Category category, Size size) {
        this.id = billDetail.getId();
        this.billId = billDetail.getBillId();
        this.productName = product.getName();
        this.productId = billDetail.getProductId();
        this.categoryName = category.getName();
        this.price = billDetail.getPrice();
        this.quantity = billDetail.getQuantity();
        this.total = this.price.multiply(new BigDecimal(this.quantity));
        this.sizeId = billDetail.getSizeId();
        this.sizeName = size.getName();
    }
}