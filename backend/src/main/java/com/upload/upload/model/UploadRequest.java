package com.upload.upload.model;

import lombok.Data;

@Data
public class UploadRequest {
	private String flightNo;
	private FileDetail file;
	
	public String getFlightNo() {
		return flightNo;
	}
	public void setFlightNo(String flightNo) {
		this.flightNo = flightNo;
	}
	public FileDetail getFile() {
		return file;
	}
	public void setFile(FileDetail file) {
		this.file = file;
	}
}
