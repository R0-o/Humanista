package site.humanista.controller.file;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import site.humanista.model.file.Category;
import site.humanista.model.file.DBFile;
import site.humanista.payload.ResponseMessage;
import site.humanista.repository.file.CategoryRepository;
import site.humanista.repository.file.DBFileRepository;
import site.humanista.service.CloudinaryFileStorageService;

@CrossOrigin(origins = { "https://backend-humanista.herokuapp.com", "https://humanista.herokuapp.com" })
@RestController
@RequestMapping("/api/file")
public class FileController {

	@Autowired
	CloudinaryFileStorageService cloudinaryService;

	@Autowired
	DBFileRepository dbFileRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@GetMapping("/list/fileName")
	public ResponseEntity<Map<String, Object>> getAllFiles(@RequestParam(required = true) String fileName,
			@RequestParam(defaultValue = "0") int idx, @RequestParam(defaultValue = "5") int size) {
		try {

			List<DBFile> fileList = new ArrayList<DBFile>();
			Pageable page = PageRequest.of(idx, size);

			Page<DBFile> filesPage;

			if (fileName == null) {
				filesPage = dbFileRepository.findAll(page);
			} else {
				filesPage = dbFileRepository.findByFileNameContaining(fileName, page);
			}

			fileList = filesPage.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("files", fileList);
			response.put("curretPage", filesPage.getNumber());
			response.put("totalItems", filesPage.getTotalElements());
			response.put("totalPages", filesPage.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/list/category_id")
	public ResponseEntity<Map<String, Object>> getFilesByCategoy(@RequestParam Long categoryId,
			@RequestParam(defaultValue = "0") int idx, @RequestParam(defaultValue = "5") int size) {
		try {

			List<DBFile> fileList = new ArrayList<DBFile>();
			Pageable page = PageRequest.of(idx, size);

			Page<DBFile> filesPage;
			filesPage = dbFileRepository.findByCategoryId(categoryId, page);

			fileList = filesPage.getContent();

			Map<String, Object> response = new HashMap<>();
			response.put("files", fileList);
			response.put("curretPage", filesPage.getNumber());
			response.put("totalItems", filesPage.getTotalElements());
			response.put("totalPages", filesPage.getTotalPages());

			return new ResponseEntity<>(response, HttpStatus.OK);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping(value = "/upload", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<?> upload(@RequestParam("file") MultipartFile multipartFile,
			@RequestParam("topic") String category) {

		try {
			Map cloudFile = cloudinaryService.uploadFile(multipartFile);

			String fileName = (String) cloudFile.get("original_filename");
			String format = (String) cloudFile.get("format");
			String cloudUrl = (String) cloudFile.get("secure_url");
			String publicId = (String) cloudFile.get("public_id");
			int pages = (int) cloudFile.get("pages");
			int bytes = (int) cloudFile.get("bytes");

			Category fileCategory = categoryRepository.findByNameIgnoreCase(category);

			DBFile file = new DBFile(publicId, fileName, cloudUrl, pages, format, fileCategory);
			dbFileRepository.save(file);

		} catch (Exception e) {

			return new ResponseEntity<>(e, HttpStatus.PAYLOAD_TOO_LARGE);
		}

		return ResponseEntity.ok(new ResponseMessage("Archivo guardado correctamente"));

	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map> delete(@PathVariable Long id) throws IOException {
		try {
			Optional<DBFile> optionalFile = dbFileRepository.findById(id);
			DBFile file = optionalFile.get();

			Map result = cloudinaryService.deleteFile(file.getFileCloudinaryId());
			dbFileRepository.deleteById(id);
			return new ResponseEntity(result, HttpStatus.OK);

		} catch (IOException e) {
			return new ResponseEntity<>(null, HttpStatus.I_AM_A_TEAPOT);
		}

	}

}
