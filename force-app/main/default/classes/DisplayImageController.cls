/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 07-27-2023
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
**/
// public with sharing class DisplayImageController {
//     @AuraEnabled(cacheable=true)
//     public static List<ContentVersion> getContentVersions(Id accountId) {
//         return [
//             SELECT Id, Title, FileType, ContentDocumentId
//             FROM ContentVersion
//             WHERE FirstPublishLocationId = :accountId
//             ORDER BY CreatedDate DESC
//         ];
//     }
// }

public with sharing class DisplayImageController {
    @AuraEnabled(cacheable=true)
    public static List<ContentVersion> getContentVersions(Id propertyId) {
        return [
            SELECT Id, Title, FileType, ContentDocumentId
            FROM ContentVersion
            WHERE FirstPublishLocationId = :propertyId
            ORDER BY CreatedDate DESC
        ];
    }
}

