package com.room911.room911.Dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class RegistroRequest {
    private Long employeeId;
    private String tipo;
    private LocalDateTime fechaHora;
}
