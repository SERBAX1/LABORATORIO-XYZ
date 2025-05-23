package com.room911.room911.Repository;

import com.room911.room911.Entity.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List; // Import List

@Repository
public interface RegistroRepository extends JpaRepository<Registro, Long> {
    List<Registro> findByEmployeeId(Long employeeId); // New method to find by employee ID
}
