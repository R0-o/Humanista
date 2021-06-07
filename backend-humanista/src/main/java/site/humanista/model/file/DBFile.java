package site.humanista.model.file;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table (name="file")
public class DBFile {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name= "file_id")
	private Long fileId;
	
	@Column(name="file_cloudinary_id")
	private String fileCloudinaryId;
	
	@Column(name= "file_name")
	private String fileName;
	
	@Column(name="file_url")
	private String fileUrl;
	
	@Transient
	private int filePages;
	
	@Column(name="file_type")
	private String fileType;
	
	/*
	 * fetch = FetchType.LAZY
	 * need to tell jackson how to serialize
	 */
	
	@ManyToOne()
	@JoinColumn(name="file_category", nullable=false)
	private Category category;
	

	public DBFile() {
		// TODO Auto-generated constructor stub
	}


	public DBFile(String fileCloudinaryId, String fileName, String fileUrl, int filePages, String fileType,
			Category category) {
		super();
		this.fileCloudinaryId = fileCloudinaryId;
		this.fileName = fileName;
		this.fileUrl = fileUrl;
		this.filePages = filePages;
		this.fileType = fileType;
		this.category = category;
	}


	public Long getFileId() {
		return fileId;
	}


	public void setFileId(Long fileId) {
		this.fileId = fileId;
	}


	public String getFileCloudinaryId() {
		return fileCloudinaryId;
	}


	public void setFileCloudinaryId(String fileCloudinaryId) {
		this.fileCloudinaryId = fileCloudinaryId;
	}


	public String getFileName() {
		return fileName;
	}


	public void setFileName(String fileName) {
		this.fileName = fileName;
	}


	public String getFileUrl() {
		return fileUrl;
	}


	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}


	public int getFilePages() {
		return filePages;
	}


	public void setFilePages(int filePages) {
		this.filePages = filePages;
	}


	public String getFileType() {
		return fileType;
	}


	public void setFileType(String fileType) {
		this.fileType = fileType;
	}


	public Category getCategory() {
		return category;
	}


	public void setCategory(Category category) {
		this.category = category;
	}


}

