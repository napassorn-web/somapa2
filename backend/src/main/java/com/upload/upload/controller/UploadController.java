package com.upload.upload.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.upload.upload.model.FileDetail;
import com.upload.upload.model.UploadRequest;
import com.upload.upload.model.Response;
import com.upload.upload.services.InvalidFileException;
import com.upload.upload.services.UploadService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class UploadController {
	
	@Autowired
	private UploadService service;
	
	@PostMapping("/upload")
	public ResponseEntity<?> upload(
	        @RequestParam("flightNo") String flightNo,
	        @RequestParam("file") MultipartFile file) {
	    try {
	        UploadRequest uploadRequest = new UploadRequest();
	        uploadRequest.setFlightNo(flightNo);

	        FileDetail fileDetail = new FileDetail();
	        fileDetail.setFile(file);
	        fileDetail.setName(file.getOriginalFilename());
	        fileDetail.setSize(file.getSize());
	        fileDetail.setType(file.getContentType());

	        uploadRequest.setFile(fileDetail);

	        Response response = service.upload(uploadRequest);

	        return ResponseEntity.ok(response);

	    } catch (InvalidFileException e) {
	        Map<String, Object> errorResponse = new HashMap<>();
	        errorResponse.put("messageCode", e.getMessageCode());
	        errorResponse.put("messageDesc", e.getMessageDesc());
	        errorResponse.put("data", e.getData());

	        return ResponseEntity.badRequest().body(errorResponse);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
	    }
	}

	
}
