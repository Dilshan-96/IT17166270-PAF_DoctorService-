<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
	<%@page import="java.nio.channels.SeekableByteChannel"%>
	<%@page import="model.Doctor"%>
	
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/doctors.js"></script>
</head>
<body>
	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Doctor Management</h1>
				

				<form id="formItem" name="formItem">
					Doctor code: 
					<input id="doctorCode" name="doctorCode" type="text" class="form-control form-control-sm"> 
					<br> Doctor name:
					<input id="doctorName" name="doctorName" type="text" class="form-control form-control-sm"> 
					<br> Doctor Charge: 
					<input id="doctorCharge" name="doctorCharge" type="text" class="form-control form-control-sm"> 
					<br> Doctor description: 
					<input id="doctorDesc" name="doctorDesc" type="text" class="form-control form-control-sm"> 
					<br> 
					<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary"> 
					<input type="hidden" id="hidItemIDSave" name="hidItemIDSave" value="">
				</form>
				
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				
				<br>
				<div id="divItemsGrid">
 				<%
				Doctor doctorObj = new Doctor();
 				out.print(doctorObj.readDoctors());
				 %>
				 </div>
			</div>
		</div>
	</div>
</body>
</html>