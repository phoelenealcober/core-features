Feature: Purchase Transaction

Background:  
Given I am on on the Login page
When I login a valid credentials
| email                                     | password            |
| phoelenealcober@bizkittechnologies.com    | phoelene_alcober    |
Then I should redirect to home page


# Material Request Purchase -> Purchase Order

Scenario: MR-PO Order item in different UOM where used UOM is maintained in the Item Profile (with barcode -> with barcode)

When User goes to new material request page
Then User fills up required material request purchase details
| target_warehouse |
| Cavite - BT      |
Then User saves an MR using scanning of item
| barcode | qty |
| jc      | 2   |

When User goes to new purchase order page
Then User creates a Purchase Order from Material Request
| supplier     |
| Supplier 666 |