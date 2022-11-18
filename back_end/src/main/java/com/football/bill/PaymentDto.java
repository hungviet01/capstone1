package com.football.bill;

import com.football.cart.CartDto;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

@Data
public class PaymentDto {

    @NotBlank
    private String fullName;

    @NotBlank
    @Pattern(regexp = "^(0|\\+84)[0-9]{9}", message = "Số điện thoại không đúng định dạng")
    private String phone;

    @NotBlank
    private String address;
    private String createdBy;
    @NotNull
    private List<CartDto> carts;
}