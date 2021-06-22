package site.humanista.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

/**
 * 
 * @author ro_o
 *	
 * https://cloudinary.com/documentation/image_upload_api_reference#examples
 */

@Service
public class CloudinaryFileStorageService {
	
	private Cloudinary cloudinary;
	
	private Map<String, String> configData = new HashMap<>();
	
	@Value("${humanista.cloudinary.cloudName}")
	private String cloudName;
	
	@Value("${humanista.cloudinary.apiKey}")
	private String apiKey;
	
	@Value("${humanista.cloudinary.apiSecret}")
	private String apiSecret;
	
	
	
	public CloudinaryFileStorageService() {
		configData.put("cloud_name", cloudName);
		configData.put("api_key", apiKey);
		configData.put("api_secret", apiSecret );
		cloudinary = new Cloudinary(configData);
	}
	
	public Map uploadFile(MultipartFile multipartFile) throws IOException {
		File file = transform(multipartFile);
		Map result = cloudinary.uploader().upload(file, ObjectUtils.emptyMap());
		file.delete();
		return result;
	}
	
	public Map deleteFile(String id) throws IOException {
		Map result = cloudinary.uploader().destroy(id, ObjectUtils.emptyMap());
		return result;
	}
	
	private File transform(MultipartFile multipartFile) throws IOException {
		File file = new File(multipartFile.getOriginalFilename());
		FileOutputStream fo = new FileOutputStream(file);
		fo.write(multipartFile.getBytes());
		fo.close();
		return file;
	}
	

}
