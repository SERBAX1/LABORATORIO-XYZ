package com.room911.room911.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String apellido;
    private String identificacion;
    private String cargo;
    private String departamento;
    @Column(nullable = true)
    private LocalDate fechaIngreso;
    @Column(nullable = true)
    private LocalDate fechaSalida;
}
