package com.upload.upload.model;

import java.util.List;

import com.upload.upload.services.ErrorDetail;

import lombok.Data;

@Data
public class Response {
	private int messageCode;
	private String messageDesc;
	private List<UploadResponse> data;
	public int getMessageCode() {
		return messageCode;
	}
	public void setMessageCode(int messageCode) {
		this.messageCode = messageCode;
	}
	public String getMessageDesc() {
		return messageDesc;
	}
	public void setMessageDesc(String messageDesc) {
		this.messageDesc = messageDesc;
	}
	public List<UploadResponse> getData() {
		return data;
	}
	public void setData(List<UploadResponse> data) {
		this.data = data;
	}
	

}
