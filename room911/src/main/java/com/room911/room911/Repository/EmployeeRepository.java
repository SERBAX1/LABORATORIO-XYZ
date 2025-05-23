package com.room911.room911.Repository;

import com.room911.room911.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    boolean existsByIdentificacion(String identificacion);
}
