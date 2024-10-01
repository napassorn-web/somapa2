package com.upload.upload.services;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DateTimeParseException;
import java.time.temporal.ChronoField;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;
import org.springframework.stereotype.Service;

import com.upload.upload.model.FileDetail;
import com.upload.upload.model.UploadRequest;
import com.upload.upload.model.UploadResponse;
import com.upload.upload.model.Response;

@Service
public class UploadService {
	private static final long MAX_FILE_SIZE = 1024 * 1024;

	public Response upload(UploadRequest request) throws InvalidFileException, Exception {
		//validate request
		boolean validate = validateRequest(request);
		if (validate) {
			Response dataResponse = validateCSVFile(request.getFile());
//			Response response = new Response();
//			response.setMessageCode(dataResponse.isEmpty() ? 400 : 200);
//	        response.setMessageDesc(dataResponse.isEmpty() ? "Invalid Data" : "success");
//	        response.setData(dataResponse); 
			return dataResponse;
		} else throw new IllegalArgumentException("Invalid Data");		
	}
	
	public boolean validateRequest(UploadRequest request) throws Exception {
		String flightNo = request.getFlightNo();
		
		if (request == null) throw new IllegalArgumentException("Request cannot be null");
		
		//validate filghtNo
		if (!flightNo.isEmpty() || flightNo != null) {
			if (!flightNo.matches("^[A-Z]{2}[0-9]{2,4}$")) {
				throw new IllegalArgumentException("Invalid flight no format");
			}
		} else throw new IllegalArgumentException("flight no is require");

		//validate file
		validateFile(request.getFile());
		
		return true;
	}
	
	public void validateFile(FileDetail file) throws Exception {

		String fileName = file.getName();
		Long fileSize = file.getSize();
		String fileType = file.getType();
		
		if (file.getFile() != null) {
			if (!(fileType.isEmpty() || fileType == null) && fileType.equals("text/csv")) {
				if ((fileSize > 0 || fileSize != null) && fileSize < MAX_FILE_SIZE) {
					if (fileName == null || fileName.isEmpty()) {
						throw new IllegalArgumentException("Invalid Data");
					}					
				}
			}
        } else throw new IllegalArgumentException("Invalid Data");
		
	}

	public Response validateCSVFile(FileDetail file) throws Exception {
		List<UploadResponse> dataError = new ArrayList<>();
		List<UploadResponse> dataResponse = new ArrayList<>();
		
		try (BufferedReader reader = new BufferedReader(new InputStreamReader(file.getFile().getInputStream()))) {
			Iterable<CSVRecord> records = CSVFormat.DEFAULT.withHeader().parse(reader);
            int rowNumber = 0;
            
            for (CSVRecord record : records) {
            	rowNumber++;
            	List<String> invalidColumns = new ArrayList<>();
            	
            	// ตรวจสอบข้อมูลในแต่ละคอลัมน์
            	if (!isValidname(record.get("First name"))) {
                    invalidColumns.add("First name");
                }
                if (!isValidname(record.get("Last name"))) {
                    invalidColumns.add("Last name");
                }
                if (!isValidGender(record.get("Gender"))) {
                    invalidColumns.add("Gender");
                }
                if (!isValidDateOfBirth(record.get("Date of birth"))) {
                    invalidColumns.add("Date of birth");
                }
                if (!isValidNationality(record.get("Nationality"))) {
                    invalidColumns.add("Nationality");
                }
                
                // ถ้ามีคอลัมน์ที่ไม่ถูกต้อง ให้เพิ่มรายละเอียดลงในรายการ
                if (!invalidColumns.isEmpty()) {
                	UploadResponse csvRow = new UploadResponse();
                	csvRow.setRow(rowNumber);
                	csvRow.setColumnInvalid(String.join(", ", invalidColumns));
                	
                	dataError.add(csvRow);
                } else {
                	UploadResponse csvRow = new UploadResponse();
                    csvRow.setRow(rowNumber);
                    csvRow.setFirstName(record.get("First name"));
                    csvRow.setLastName(record.get("Last name"));
                    csvRow.setGender(record.get("Gender"));
                    csvRow.setDateOfBirth(record.get("Date of birth"));
                    csvRow.setNationality(record.get("Nationality"));
                    
                    dataResponse.add(csvRow);
                }
            }
		} catch (Exception e) {
			throw new RuntimeException("Error reading the CSV file", e);
		}
		Response result = new Response();
	    if (!dataError.isEmpty()) {
	    	result.setMessageCode(400);
	    	result.setMessageDesc("Invalid Data");
	    	result.setData(dataError); 
	    } else {
	    	result.setMessageCode(200);
	    	result.setMessageDesc("success");
	    	result.setData(dataResponse);
	    }

		return result;
	}
	
	private boolean isValidname(String name) {
        return name != null && name.matches("^[A-Za-z]{1,20}$");
    }
	
	private boolean isValidGender(String gender) {
        return gender != null && (gender.equals("Male") || gender.equals("Female") || gender.equals("Unknown"));
    }
	
	private boolean isValidDateOfBirth(String dob) {
	    DateTimeFormatter formatter = new DateTimeFormatterBuilder()
	        .appendPattern("dd-MM-")
	        .appendValueReduced(ChronoField.YEAR, 2, 4, 1900) // รองรับปี 2 หรือ 4 หลัก
	        .toFormatter();
	    
	    try {
	        LocalDate date = LocalDate.parse(dob, formatter);
	        // ตรวจสอบว่ามีอยู่จริงในปฏิทิน และต้องไม่มากกว่าวันที่ปัจจุบัน
	        return !date.isAfter(LocalDate.now());
	    } catch (DateTimeParseException e) {
	        return false;
	    }
	}

    private boolean isValidNationality(String nationality) {
        return nationality != null && nationality.matches("^[A-Z]{3}$");
    }
}
