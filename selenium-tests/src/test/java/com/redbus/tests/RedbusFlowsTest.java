package com.redbus.tests;

import com.redbus.base.BaseTest;
import org.openqa.selenium.By;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * 6 user flows for college assignment (Selenium + TestNG assertions).
 */
public class RedbusFlowsTest extends BaseTest {

  private static final String SEARCH_DATE = "2026-12-20";

  // Flow 1: Landing page loads with search form
  @Test(priority = 1, description = "Flow 1 - Landing page loads")
  public void flow1_landingPageLoads() {
    driver.get(baseUrl + "/");
    Assert.assertTrue(
        driver.findElement(By.cssSelector("[data-testid='search-bus-btn']")).isDisplayed(),
        "Search Bus button should be visible");
    Assert.assertTrue(
        driver.findElement(By.cssSelector("[data-testid='source-input']")).isDisplayed(),
        "Source input should be visible");
    Assert.assertTrue(
        driver.findElement(By.cssSelector("[data-testid='destination-input']")).isDisplayed(),
        "Destination input should be visible");
  }

  // Flow 2: Bus search (Lucknow -> Delhi)
  @Test(priority = 2, description = "Flow 2 - Bus search navigation")
  public void flow2_busSearch() {
    driver.get(baseUrl + "/");
    driver.findElement(By.cssSelector("[data-testid='source-input']")).sendKeys("Lucknow");
    driver.findElement(By.cssSelector("[data-testid='destination-input']")).sendKeys("Delhi");
    driver.findElement(By.cssSelector("[data-testid='date-input']")).sendKeys(SEARCH_DATE);
    driver.findElement(By.cssSelector("[data-testid='search-bus-btn']")).click();
    Assert.assertTrue(
        driver.getCurrentUrl().contains("/select-bus"),
        "Should navigate to select-bus page");
    Assert.assertTrue(
        driver.getCurrentUrl().contains("departure=Lucknow"),
        "URL should contain departure city");
    Assert.assertTrue(
        driver.getCurrentUrl().contains("arrival=Delhi"),
        "URL should contain arrival city");
  }

  // Flow 3: Select bus page shows route header
  @Test(priority = 3, description = "Flow 3 - Select bus results page")
  public void flow3_selectBusPage() {
    driver.get(baseUrl + "/select-bus?departure=Lucknow&arrival=Delhi&date=" + SEARCH_DATE);
    String headerText =
        driver.findElement(By.cssSelector("[data-testid='select-bus-header']")).getText();
    Assert.assertTrue(headerText.contains("Lucknow"), "Header should show departure");
    Assert.assertTrue(headerText.contains("Delhi"), "Header should show arrival");
    Assert.assertTrue(headerText.contains(SEARCH_DATE), "Header should show date");
  }

  // Flow 4: Bus hire page navigation
  @Test(priority = 4, description = "Flow 4 - Bus hire page")
  public void flow4_busHirePage() {
    driver.get(baseUrl + "/");
    driver.findElement(By.cssSelector("[data-testid='bus-hire-link']")).click();
    Assert.assertTrue(
        driver.getCurrentUrl().contains("/bus-hire"),
        "Should open bus hire page");
    Assert.assertTrue(
        driver.getPageSource().contains("Bus Hire"),
        "Bus hire content should be visible");
  }

  // Flow 5: Bus hire quotations page
  @Test(priority = 5, description = "Flow 5 - Bus hire quotations")
  public void flow5_busHireQuotations() {
    driver.get(
        baseUrl
            + "/bus-hire-card?pickUp=Mumbai&drop=Pune&pickUpDate=2026-12-20&dropDate=2026-12-21&totalPassengers=4");
    Assert.assertTrue(
        driver.findElement(By.cssSelector("[data-testid='bus-hire-card-page']")).isDisplayed(),
        "Bus hire card page should load");
    Assert.assertTrue(
        driver.getPageSource().toLowerCase().contains("quotation"),
        "Page should show quotations section");
  }

  // Flow 6: Profile page + 404 error page
  @Test(priority = 6, description = "Flow 6 - Profile and error pages")
  public void flow6_profileAndErrorPage() {
    driver.get(baseUrl + "/my-profile");
    Assert.assertTrue(
        driver.findElement(By.cssSelector("[data-testid='profile-page']")).isDisplayed(),
        "Profile page should load");

    driver.get(baseUrl + "/this-route-does-not-exist");
    Assert.assertTrue(
        driver.findElement(By.cssSelector("[data-testid='error-page']")).isDisplayed(),
        "404 error page should load");
  }
}
