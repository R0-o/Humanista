package site.humanista.repository.file;

import javax.transaction.Transactional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import site.humanista.model.file.DBFile;

@Repository
@Transactional
public interface DBFileRepository extends JpaRepository<DBFile, Long> {
	
	Page<DBFile> findByCategoryId(Long categoryId, Pageable pageable);
	Page<DBFile> findByFileNameContaining(String fileName, Pageable pageable);
	

}
