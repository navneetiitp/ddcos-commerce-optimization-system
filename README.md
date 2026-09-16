# DDCOS — Data-Driven Commerce Optimization System

> A full-stack commerce intelligence platform that combines demand forecasting, ML-based dynamic pricing, inventory management, customer-event analytics, simulation, and revenue optimization in a single dashboard.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue)](https://ddcos-commerce-optimization-system.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-FastAPI-green)](https://ddcos-commerce-optimization-system.onrender.com/docs)
[![Frontend](https://img.shields.io/badge/Frontend-React%20%2B%20TypeScript-61DAFB)](https://react.dev/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791)](https://www.postgresql.org/)
[![ML](https://img.shields.io/badge/ML-scikit--learn-orange)](https://scikit-learn.org/)

---

## 🚀 Live Application

**Frontend:**  
https://ddcos-commerce-optimization-system.vercel.app

**Backend API:**  
https://ddcos-commerce-optimization-system.onrender.com

**Swagger API Documentation:**  
https://ddcos-commerce-optimization-system.onrender.com/docs

---

## 📌 Overview

DDCOS (Data-Driven Commerce Optimization System) is a full-stack commerce optimization platform designed to help businesses make data-driven decisions around:

- Product pricing
- Demand estimation
- Inventory management
- Customer behavior
- Revenue analysis
- Pricing risk
- Revenue optimization

The system uses historical price-demand observations to train product-specific machine learning models and then evaluates multiple candidate prices to identify the price that maximizes predicted revenue.

The application also includes simulation and Monte Carlo analysis to study pricing outcomes under uncertainty.

---

## ✨ Key Features

### 📊 Business Dashboard

- Revenue KPIs
- Sales metrics
- Demand trends
- Average product price
- Top-performing products
- Customer-event statistics
- Business insights

### 📦 Inventory Management

- Add products
- Update product information
- Update prices
- Delete products
- Search products
- Sort and filter inventory
- Track stock levels

### 💰 ML-Based Pricing Optimization

For each product, the system can:

- Train a demand model
- Estimate demand at different prices
- Simulate price-demand relationships
- Calculate predicted revenue
- Search for revenue-maximizing prices
- Estimate demand elasticity
- Analyze pricing uncertainty

### 🤖 Machine Learning

The training pipeline:

1. Groups historical observations by product.
2. Uses historical price and demand data.
3. Trains a separate Linear Regression model for each product.
4. Evaluates the models using:
   - R²
   - MSE
   - RMSE
5. Uses the trained models during price optimization.

### 🎲 Monte Carlo Risk Analysis

The pricing optimizer also provides uncertainty analysis using Monte Carlo simulation.

It estimates:

- Expected revenue
- Revenue distribution
- P10 revenue
- P90 revenue
- Pricing risk

### 📈 Analytics

The analytics module provides:

- Revenue trends
- Sales analysis
- Product performance
- Revenue distribution
- Demand-related metrics

### 🧪 Data Simulation

DDCOS includes a simulation engine that generates realistic historical price-demand observations and customer events.

This makes it possible to demonstrate the complete ML pipeline without requiring a real production commerce dataset.

---

# 🏗️ System Architecture

```text
                    React + TypeScript
                           │
                           │ REST API
                           ▼
                  ┌─────────────────┐
                  │     FastAPI     │
                  │   REST Backend  │
                  └────────┬────────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
        SQLAlchemy      ML Service    API Routes
             │             │
             ▼             ▼
       PostgreSQL      scikit-learn
