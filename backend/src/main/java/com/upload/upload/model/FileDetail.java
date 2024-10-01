package com.upload.upload.model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class FileDetail {
	private MultipartFile file;
	private String name;
    private Long size;
    private String type;
    
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getSize() {
		return size;
	}
	public void setSize(Long size) {
		this.size = size;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
}
