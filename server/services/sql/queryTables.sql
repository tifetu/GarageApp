-- Customers tables  
CREATE TABLE IF NOT EXISTS customer_identifier (
  customer_id INT(11) NOT NULL AUTO_INCREMENT,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone_number VARCHAR(255) NOT NULL,
  customer_added_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  customer_hash VARCHAR(255) NOT NULL,
  PRIMARY KEY (customer_id),
  UNIQUE (customer_email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customer_info (
  customer_info_id INT(11) NOT NULL AUTO_INCREMENT,
  customer_id INT(11) NOT NULL, 
  customer_first_name VARCHAR(255) NOT NULL,
  customer_last_name VARCHAR(255) NOT NULL,
  active_customer_status INT(11) NOT NULL,
  PRIMARY KEY (customer_info_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customer_vehicle_info (
  vehicle_id INT(11) NOT NULL AUTO_INCREMENT,
  customer_id INT(11) NOT NULL, 
  vehicle_year INT(11) NOT NULL,
  vehicle_make VARCHAR(255) NOT NULL,
  vehicle_model VARCHAR(255) NOT NULL,
  vehicle_type VARCHAR(255) NOT NULL,
  vehicle_mileage INT(11) NOT NULL, 
  vehicle_tag VARCHAR(255) NOT NULL,
  vehicle_serial VARCHAR(255) NOT NULL,
  vehicle_color VARCHAR(255) NOT NULL,
  PRIMARY KEY (vehicle_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
) ENGINE=InnoDB;

-- Company tables 
CREATE TABLE IF NOT EXISTS company_roles (
  company_role_id INT(11) NOT NULL AUTO_INCREMENT,
  company_role_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (company_role_id),
  UNIQUE (company_role_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS common_services (
  service_id INT(11) NOT NULL AUTO_INCREMENT,
  service_name VARCHAR(255) NOT NULL,
  service_description TEXT,
  PRIMARY KEY (service_id)
) ENGINE=InnoDB;

-- Employee tables 
CREATE TABLE IF NOT EXISTS employee (
  employee_id INT(11) NOT NULL AUTO_INCREMENT,
  employee_email VARCHAR(255) NOT NULL,
  active_employee INT(11) NOT NULL,
  added_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (employee_id), 
  UNIQUE (employee_email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_info (
  employee_info_id INT(11) NOT NULL AUTO_INCREMENT,
  employee_id INT(11) NOT NULL,
  employee_first_name VARCHAR(255) NOT NULL,
  employee_last_name VARCHAR(255) NOT NULL,
  employee_phone VARCHAR(255) NOT NULL,
  PRIMARY KEY (employee_info_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_pass (
  employee_pass_id INT(11) NOT NULL AUTO_INCREMENT,
  employee_id INT(11) NOT NULL,
  employee_password_hashed VARCHAR(255) NOT NULL,
  PRIMARY KEY (employee_pass_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS employee_role (
  employee_role_id INT(11) NOT NULL AUTO_INCREMENT,
  employee_id INT(11) NOT NULL UNIQUE,
  company_role_id INT(11) NOT NULL,
  PRIMARY KEY (employee_role_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
  FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id)
) ENGINE=InnoDB;

-- Order tables  
CREATE TABLE IF NOT EXISTS orders (
  order_id INT(11) NOT NULL AUTO_INCREMENT,
  employee_id INT(11) NOT NULL,
  customer_id INT(11) NOT NULL,
  vehicle_id INT(11) NOT NULL,
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  active_order INT(11) NOT NULL,
  order_hash VARCHAR(255) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id), 
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle_info(vehicle_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_info (
  order_info_id INT(11) NOT NULL AUTO_INCREMENT,
  order_id INT(11) NOT NULL,
  order_total_price INT(11) NOT NULL,
  additional_request TEXT,
  additional_requests_completed INT(11) NOT NULL,
  PRIMARY KEY (order_info_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_services (
  order_service_id INT(11) NOT NULL AUTO_INCREMENT,
  order_id INT(11) NOT NULL,
  service_id INT(11) NOT NULL,
  service_completed INT(11) NOT NULL,
  PRIMARY KEY (order_service_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (service_id) REFERENCES common_services(service_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS order_status (
  order_status_id INT(11) NOT NULL AUTO_INCREMENT,
  order_id INT(11) NOT NULL,
  status INT(11) NOT NULL,
  PRIMARY KEY (order_status_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB;

-- ✅ Move inserts to the very end
INSERT INTO company_roles (company_role_name)
VALUES ('Employee'), ('Manager'), ('Admin');
