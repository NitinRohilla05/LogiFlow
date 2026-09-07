CREATE DATABASE IF NOT EXISTS logiflow
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE logiflow;

-- ==========================================
-- USERS
-- ==========================================

CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM('customer', 'admin')
        NOT NULL DEFAULT 'customer',

    created_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);

-- ==========================================
-- SHIPMENTS
-- ==========================================

CREATE TABLE IF NOT EXISTS shipments (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    tracking_id VARCHAR(30) NOT NULL UNIQUE,

    sender VARCHAR(150) NOT NULL,

    receiver VARCHAR(150) NOT NULL,

    origin VARCHAR(150) NOT NULL,

    destination VARCHAR(150) NOT NULL,

    status ENUM(
        'pending',
        'picked-up',
        'in-transit',
        'warehouse',
        'out-for-delivery',
        'delivered'
    ) NOT NULL DEFAULT 'pending',

    weight DECIMAL(10,2) NOT NULL,

    estimated_delivery DATETIME NOT NULL,

    created_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_shipments_status (status),

    INDEX idx_shipments_destination (destination)
);

-- ==========================================
-- TRACKING EVENTS
-- ==========================================

CREATE TABLE IF NOT EXISTS tracking_events (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    tracking_id VARCHAR(30) NOT NULL,

    status ENUM(
        'pending',
        'picked-up',
        'in-transit',
        'warehouse',
        'out-for-delivery',
        'delivered'
    ) NOT NULL,

    location VARCHAR(150) NOT NULL,

    description VARCHAR(500) NOT NULL,

    timestamp TIMESTAMP
        NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_tracking_events_tracking_id (
        tracking_id
    ),

    INDEX idx_tracking_events_timestamp (
        timestamp
    ),

    CONSTRAINT fk_tracking_events_shipment
        FOREIGN KEY (tracking_id)
        REFERENCES shipments(tracking_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ==========================================
-- SAMPLE ADMIN USER
-- ==========================================
-- Password must be generated through the application
-- using bcrypt. Do not insert a plain-text password here.

-- ==========================================
-- SAMPLE SHIPMENT
-- ==========================================

INSERT INTO shipments (
    tracking_id,
    sender,
    receiver,
    origin,
    destination,
    status,
    weight,
    estimated_delivery
)
SELECT
    'LF123456789',
    'LogiFlow Warehouse',
    'Rahul Sharma',
    'New Delhi',
    'Jaipur',
    'in-transit',
    4.50,
    DATE_ADD(NOW(), INTERVAL 6 HOUR)
WHERE NOT EXISTS (
    SELECT 1
    FROM shipments
    WHERE tracking_id = 'LF123456789'
);

-- ==========================================
-- SAMPLE TRACKING EVENTS
-- ==========================================

INSERT INTO tracking_events (
    tracking_id,
    status,
    location,
    description
)
SELECT
    'LF123456789',
    'pending',
    'New Delhi',
    'Shipment information received.'
WHERE NOT EXISTS (
    SELECT 1
    FROM tracking_events
    WHERE tracking_id = 'LF123456789'
      AND status = 'pending'
);

INSERT INTO tracking_events (
    tracking_id,
    status,
    location,
    description
)
SELECT
    'LF123456789',
    'picked-up',
    'New Delhi',
    'Shipment picked up from the sender.'
WHERE NOT EXISTS (
    SELECT 1
    FROM tracking_events
    WHERE tracking_id = 'LF123456789'
      AND status = 'picked-up'
);

INSERT INTO tracking_events (
    tracking_id,
    status,
    location,
    description
)
SELECT
    'LF123456789',
    'in-transit',
    'Gurugram, Haryana',
    'Shipment is currently moving toward Jaipur.'
WHERE NOT EXISTS (
    SELECT 1
    FROM tracking_events
    WHERE tracking_id = 'LF123456789'
      AND status = 'in-transit'
);