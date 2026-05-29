import static com.kms.katalon.core.checkpoint.CheckpointFactory.findCheckpoint
import static com.kms.katalon.core.testcase.TestCaseFactory.findTestCase
import static com.kms.katalon.core.testdata.TestDataFactory.findTestData
import static com.kms.katalon.core.testobject.ObjectRepository.findTestObject
import com.kms.katalon.core.checkpoint.Checkpoint as Checkpoint
import com.kms.katalon.core.checkpoint.CheckpointFactory as CheckpointFactory
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as MobileBuiltInKeywords
import com.kms.katalon.core.model.FailureHandling as FailureHandling
import com.kms.katalon.core.testcase.TestCase as TestCase
import com.kms.katalon.core.testcase.TestCaseFactory as TestCaseFactory
import com.kms.katalon.core.testdata.TestData as TestData
import com.kms.katalon.core.testdata.TestDataFactory as TestDataFactory
import com.kms.katalon.core.testobject.ObjectRepository as ObjectRepository
import com.kms.katalon.core.testobject.TestObject as TestObject
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WSBuiltInKeywords
import com.kms.katalon.core.webui.driver.DriverFactory as DriverFactory
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUiBuiltInKeywords
import internal.GlobalVariable as GlobalVariable
import com.kms.katalon.core.webui.keyword.WebUiBuiltInKeywords as WebUI
import com.kms.katalon.core.mobile.keyword.MobileBuiltInKeywords as Mobile
import com.kms.katalon.core.webservice.keyword.WSBuiltInKeywords as WS
import com.kms.katalon.core.testobject.SelectorMethod

import com.thoughtworks.selenium.Selenium
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.WebDriver
import com.thoughtworks.selenium.webdriven.WebDriverBackedSelenium
import static org.junit.Assert.*
import java.util.regex.Pattern
import static org.apache.commons.lang3.StringUtils.join
import org.testng.asserts.SoftAssert
import com.kms.katalon.core.testdata.CSVData
import org.openqa.selenium.Keys as Keys

SoftAssert softAssertion = new SoftAssert();
WebUI.openBrowser('https://www.google.com/')
def driver = DriverFactory.getWebDriver()
String baseUrl = "https://www.google.com/"
selenium = new WebDriverBackedSelenium(driver, baseUrl)
selenium.open("https://kamylu.github.io/Plataforma_Web_SAV/")
selenium.click("xpath=//button[@id='btn-choose-vet']/span")
selenium.type("id=login-user", "cristina")
selenium.click("id=login-pass")
selenium.type("id=login-pass", "1234")
selenium.sendKeys("id=login-pass", Keys.ENTER)
selenium.click("id=btn-submit-login")
selenium.click("id=input-microchip")
selenium.type("id=input-microchip", "111111111")
selenium.click("xpath=//button[@id='btn-validate-sav']/i")
selenium.click("xpath=//div[@id='screen-dashboard']/div/section/div[2]")
selenium.type("id=input-microchip", "")
selenium.click("xpath=//div[@id='screen-dashboard']/div/section[2]/div/i")
selenium.click("xpath=//div[@id='screen-dashboard']/div/section[2]/div/i")
selenium.click("id=btn-show-register-animal")
selenium.click("id=reg-chip")
selenium.type("id=reg-chip", "123123")
selenium.click("id=reg-nif")
selenium.type("id=reg-nif", "123456789")
selenium.click("id=reg-nome")
selenium.type("id=reg-nome", "Bobi")
selenium.click("id=reg-especie")
selenium.click("id=reg-raca")
selenium.select("id=reg-raca", "label=Dobermann")
selenium.click("id=reg-raca")
selenium.select("id=reg-raca", "label=Golden Retriever")
selenium.click("id=btn-submit-animal")
selenium.click("id=btn-back-dash")
selenium.click("id=input-microchip")
selenium.click("id=input-microchip")
selenium.click("id=btn-validate-sav")
