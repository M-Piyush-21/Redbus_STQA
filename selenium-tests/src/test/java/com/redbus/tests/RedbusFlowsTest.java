package com.redbus.tests;

import com.redbus.base.BaseTest;
import org.openqa.selenium.By;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.time.Duration;

/**
 * 6 UNIQUE Selenium flows (TestNG assertions).
 * Cypress and JMeter cover different scenarios.
 */
public class RedbusFlowsTest extends BaseTest {

  private static final String SEARCH_DATE = "2026-12-20";

  @Test(priority = 1, description = "SL-01 Navbar and landing search form")
  public void sl01_navbarAndLandingForm() {
    driver.get(baseUrl + "/bus-hire");
    driver.findElement(By.cssSelector("[data-testid='bus-tickets-link']")).click();
    Assert.assertTrue(driver.getCurrentUrl().endsWith("/") || driver.getCurrentUrl().contains("localhost:3000/"),
        "BUS TICKETS should navigate home");
    Assert.assertTrue(driver.findElement(By.cssSelector("[data-testid='search-bus-btn']")).isDisplayed());
    Assert.assertTrue(driver.findElement(By.cssSelector("[data-testid='date-input']")).isDisplayed());
  }

  @Test(priority = 2, description = "SL-02 Bus search Lucknow to Delhi")
  public void sl02_busSearchLucknowToDelhi() {
    driver.get(baseUrl + "/");
    driver.findElement(By.cssSelector("[data-testid='source-input']")).sendKeys("Lucknow");
    driver.findElement(By.cssSelector("[data-testid='destination-input']")).sendKeys("Delhi");
    driver.findElement(By.cssSelector("[data-testid='date-input']")).sendKeys(SEARCH_DATE);
    driver.findElement(By.cssSelector("[data-testid='search-bus-btn']")).click();
    Assert.assertTrue(driver.getCurrentUrl().contains("/select-bus"));
    Assert.assertTrue(driver.getCurrentUrl().contains("departure=Lucknow"));
    Assert.assertTrue(driver.getCurrentUrl().contains("arrival=Delhi"));
  }

  @Test(priority = 3, description = "SL-03 Select bus route header")
  public void sl03_selectBusRouteHeader() {
    driver.get(baseUrl + "/select-bus?departure=Lucknow&arrival=Delhi&date=" + SEARCH_DATE);
    String header = driver.findElement(By.cssSelector("[data-testid='select-bus-header']")).getText();
    Assert.assertTrue(header.contains("Lucknow"));
    Assert.assertTrue(header.contains("Delhi"));
    Assert.assertTrue(header.contains(SEARCH_DATE));
  }

  @Test(priority = 4, description = "SL-04 Invalid route shows modal")
  public void sl04_invalidRouteShowsModal() {
    driver.get(baseUrl + "/");
    driver.findElement(By.cssSelector("[data-testid='source-input']")).sendKeys("Mumbai");
    driver.findElement(By.cssSelector("[data-testid='destination-input']")).sendKeys("Pune");
    driver.findElement(By.cssSelector("[data-testid='date-input']")).sendKeys(SEARCH_DATE);
    driver.findElement(By.cssSelector("[data-testid='search-bus-btn']")).click();
    WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector("[data-testid='routes-modal']")));
    Assert.assertTrue(driver.findElement(By.cssSelector("[data-testid='routes-modal-table']")).isDisplayed());
    Assert.assertFalse(driver.getCurrentUrl().contains("/select-bus"));
  }

  @Test(priority = 5, description = "SL-05 Bus hire page navigation")
  public void sl05_busHirePageNavigation() {
    driver.get(baseUrl + "/");
    driver.findElement(By.cssSelector("[data-testid='bus-hire-link']")).click();
    Assert.assertTrue(driver.getCurrentUrl().contains("/bus-hire"));
    Assert.assertTrue(driver.getPageSource().contains("Hire a Vehicle"));
  }

  @Test(priority = 6, description = "SL-06 404 error page")
  public void sl06_errorPage404() {
    driver.get(baseUrl + "/unknown-page-xyz");
    Assert.assertTrue(driver.findElement(By.cssSelector("[data-testid='error-page']")).isDisplayed());
  }
}
