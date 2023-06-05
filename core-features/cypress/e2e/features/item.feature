Feature: Item Profile 

Background:  
Given I am on on the Login page
When I login a valid credentials
| email                                     | password            |
| phoelenealcober@bizkittechnologies.com    | phoelene_alcober    |
Then I should redirect to home page

#Scenario: Auto generated SKU

##Check hidden fields in item form
#When User checks new item form
#Then Item code field should not be reflected
#Then Naming series field should not be reflected

##Create new item then check auto generated SKU
#When User create a new item
#| item_name  | item_group      | default_uom   |
#| strawberry | Perishable      | Piece         |
#Then System should auto-generate SKU

##Note add deletion of created test data

##Rename an item code
#Then User should not be able to rename an item code

#Scenario: Disable batches
#Check hidden batch field
#When User checks new item form
#Then Has Batch field should be disabled


#Scenario: Disable serial numbers

##Check hidden series number field
#When User checks new item form
#Then Serial Number field should be disabled


Scenario: UOM conversion listing

#Check UOM options for stock UOM 

#Check defined stock UOM and conversion factor in UOMs table
# When User checks new item form
# When User create a new item
# | item_name  | item_group      | default_uom   |
# | tshirt     | Divided         | Piece         |
# Then Defined default UOM should be added to UOMs table
# Then Default UOM conversion factor should be equal to 1

#Change stock UOM where conversion factor ≠ 1
# When User checks new item form
# When User create a new item
# | item_name  | item_group      | default_uom   |
# | tshirt     | Divided         | Piece         |
# When User change default UOM conversion factor
# |conversion_factor|
# |20               |
# Then System should prompt an error
# |error_message|
# |Default unit of measurement must have a conversion factor of 1. The change you made will be reverted.|

#Add new UOM where UOM ≠ stock UOM and conversion factor = 1
When User checks new item form
When User create a new item
| item_name  | item_group      | default_uom   |
| tshirt     | Divided         | Piece         | 
When User adds another UOM in UOMs table
| uom            | conversion_factor |
| Box            | 5                 |
When User modify non-stock UOM conversion factor to 1
Then System should prompt an error
|error_message|
|Only the deafult unit of measurement may have a conversion factor of 1. Your change will be reverted.|

#Change item stock UOM where item has no transaction
# When User checks new item form
# When User create a new item
# | item_name  | item_group      | default_uom   |
# | strawberry | Perishable      | Piece         |
# Then New defined default stock UOM should be reflected
# |default_uom|
# |Box        |

#Change item stock UOM where item has transaction



#Check sales UOM drop down list options for saved item
# When User checks new item form
# When User create a new item
# | item_name  | item_group      | default_uom   |
# | strawberry | Perishable      | Piece         | 
# When User adds another UOM in UOMs table
# |      uom       | conversion_factor |
# | Box            | 5                 |
# Then UOM list should be reflected in Sales UOM options
# | default_uom   |
# | Piece         |
# | Box           |

#Check sales UOM drop down list options for unsaved item
# When User checks new item form
# When User creates new item without saving
# | item_name  | item_group      | default_uom   |
# | strawberry | Perishable      | Piece         |
# When User adds another UOM in UOMs table without saving
# |      uom       | conversion_factor |
# | Box            | 5                 |
# Then UOM list should be reflected in Sales UOM options
# | default_uom   |
# | Piece         |
# | Box           |

#Add sales UOM where UOM has conversion factor


#Add sales UOM where UOM has no conversion factor

#Check purchase UOM drop down list options for saved item
# When User checks new item form
# When User create a new item
# | item_name  | item_group      | default_uom   |
# | strawberry | Perishable      | Piece         | 
# When User adds another UOM in UOMs table
# |      uom       | conversion_factor |
# | Box            | 5                 |
# Then UOM list should be reflected in Purchase UOM options
# | default_uom   |
# | Piece         |
# | Box           |

#Check purchase UOM drop down list options for unsaved item
# When User checks new item form
# When User creates new item without saving
# | item_name  | item_group      | default_uom   |
# | strawberry | Perishable      | Piece         |
# When User adds another UOM in UOMs table without saving
# |      uom       | conversion_factor |
# | Box            | 5                 |
# Then UOM list should be reflected in Purchase UOM options
# | default_uom   |
# | Piece         |
# | Box           |

#Add purchase UOM where UOM has conversion factor

#Add purchase UOM where UOM has no conversion factor

#Add UOM with zero conversion factor
# When User checks new item form
# When User creates new item without saving
# | item_name  | item_group      | default_uom   |
# | Croptop    | Divided         | Piece         |
# When User adds another UOM in UOMs table without saving
# |      uom       | conversion_factor |
# | Box            | 0                 |
# Then System should prompt an error
# |error_message|
# |Conversion factor must not be a zero or negative value. Your change will be reverted.|

#Add UOM with a negative number conversion factor
# When User checks new item form
# When User creates new item without saving
# | item_name  | item_group      | default_uom   |
# | Croptop    | Divided         | Piece         |
# When User adds another UOM in UOMs table without saving
# |      uom       | conversion_factor |
# | Box            | -1                |
# Then System should prompt an error
# |error_message|
# |Conversion factor must not be a zero or negative value. Your change will be reverted.|


#Remove UOM from the UOMs table where UOM is not referenced in buying and selling price
# When User checks new item form
# When User create a new item
# | item_name  | item_group      | default_uom   |
# | strawberry | Perishable      | Piece         | 
# When User adds another UOM in UOMs table
# ||      uom       | conversion_factor |
# | Box            | 5                 |
# When User removes a UOM from UOM list
# Then Removed UOM should not be visible
# | default_uom    |
# | Box            |

#Remove UOM from the UOMs table where UOM is referenced in buying and selling price

#Modify UOM from the UOMs table where UOM is not referenced in buying and selling price
# When User checks new item form
# When User create a new item
# | item_name  | item_group      | default_uom   |
# | strawberry | Perishable      | Piece         | 
# When User adds another UOM in UOMs table
# |      uom       | conversion_factor |
# | Box            | 5                 |
# When User modify a UOM from UOM list
# | uom             |
# | Case            |
# Then Modified UOM should be reflected
# | uom             |
# | Case            |

#Modify UOM from the UOMs table where UOM is referenced in buying and selling price
