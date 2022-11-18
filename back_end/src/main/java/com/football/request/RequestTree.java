package com.football.request;

import com.football.common.dto.TreeDTO;
import com.football.common.utils.DateUtils;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RequestTree extends TreeDTO<RequestDto> {

    private Date hireDate;
    private Long typeId;
    public RequestTree(Date hireDate, String typeName, Long typeId) {
        this.setKey(DateUtils.dateToString(hireDate, "dd-MM-yyyy") + " - " + typeName);
        this.hireDate = hireDate;
        this.typeId = typeId;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(this.getKey());
    }

    @Override
    public boolean equals(Object o) {
        if (o == null) return false;
        if (!(o instanceof RequestTree)) return false;
        RequestTree requestTree = (RequestTree) o;
        return Objects.equals(requestTree.getKey(), this.getKey());
    }
}
