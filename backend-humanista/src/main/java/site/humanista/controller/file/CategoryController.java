package site.humanista.controller.file;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import site.humanista.model.file.Category;
import site.humanista.repository.file.CategoryRepository;

@CrossOrigin(origins = { "https://backend-humanista.herokuapp.com", "https://humanista.herokuapp.com" })
@RestController
@RequestMapping("/api/category")
public class CategoryController {

	@Autowired
	CategoryRepository categoryRepository;

	@GetMapping("/map")
	public ResponseEntity<Map<String, String>> getCategoryList() {
		Map<String, String> nameList = categoryRepository.mapCategory();

		return new ResponseEntity(nameList, HttpStatus.OK);
	}

	@GetMapping("/list")
	public ResponseEntity<List<Category>> getRolesList() {
		List<Category> list = categoryRepository.findAll();
		return new ResponseEntity(list, HttpStatus.OK);
	}

}
