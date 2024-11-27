service DeliveryAPIService {

    // Define the DeliveryTemplateAssignments entity
    entity DeliveryTemplateAssignments {
        key ID                  : UUID; // Primary key
        supplyNetworkNode_ID     : UUID;
        schedulingGroup_ID       : UUID;
        supplyingSite_ID         : String;
        supplier_ID              : String;
        recipient_ID             : String;
        deliveryTemplate_ID      : UUID;
        validityStartDate        : Date;
        validityEndDate          : Date;
        orderDeliveryScheduleType: String;
        modifiedAt               : Timestamp;
    }

    // Define actions for API operations
    action CreateDeliveryTemplateAssignment(data: DeliveryTemplateAssignments);
    action DeleteDeliveryTemplateAssignment(ID: UUID);
    action GetDeliveryTemplateByID(ID: UUID);
    action GetAssignmentsByTemplateID(ID: UUID);
}
