package site.humanista.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import site.humanista.model.user.EnumRole;
import site.humanista.model.user.Role;

public interface RoleRepository extends JpaRepository<Role,Long>{
	
	Optional<Role> findByName(EnumRole name);

}
