package com.upload.upload.services;

import java.util.List;

public class InvalidFileException extends RuntimeException {
	private static final long serialVersionUID = 1L;
	private int messageCode;
	private String messageDesc;
	private List<ErrorDetail> data;

	public InvalidFileException(int messageCode, String messageDesc, List<ErrorDetail> data) {
        super("Invalid file");
        this.data = data;
        this.messageCode = messageCode;
        this.messageDesc = messageDesc;
    }
	
	public List<ErrorDetail> getData() {
        return data;
    }

	public int getMessageCode() {
		return messageCode;
	}

	public String getMessageDesc() {
		return messageDesc;
	}

	public void setMessageDesc(String messageDesc) {
		this.messageDesc = messageDesc;
	}

}
