package site.humanista.repository.file;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import site.humanista.model.file.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
	
	Category findByNameIgnoreCase(String categoryName);
	
	@Query("SELECT c.name FROM Category c")
	List<String> findAllCategoryListName();
	
	
	@Query("SELECT c.value, c.name FROM Category c")
	default Map<String,String> mapCategory(){
		return findAll().stream().collect(Collectors.toMap(c -> c.getValue(), c -> c.getName()));
	}
	
	List<Category> findAll();
}
