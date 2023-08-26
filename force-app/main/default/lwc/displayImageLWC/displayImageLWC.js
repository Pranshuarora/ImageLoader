// import { LightningElement, wire, api } from 'lwc';
// import { loadStyle } from 'lightning/platformResourceLoader';
// import displayImageLWCStyles from '@salesforce/resourceUrl/displayImageLWCStyles';
// import getContentVersions from '@salesforce/apex/DisplayImageController.getContentVersions';


// export default class DisplayImageLWC extends LightningElement {
//     @api recordId; // This will hold the Account record Id
//     contentUrls = []; // Array to store the image URLs
//     currentImageIndex = 0; // Index of the currently displayed image

//     @wire(getContentVersions, { accountId: '$recordId' })
//     contentVersions({ error, data }) {
//         if (data) {
//             this.contentUrls = data.map(contentVersion => this.getUrlForContentVersion(contentVersion.Id));
//         } else if (error) {
//             console.error('Error fetching content versions:', error);
//         }
//     }

//     renderedCallback() {
//         // Load the CSS styles from the static resource
//         loadStyle(this, displayImageLWCStyles)
//             .catch(error => {
//                 console.error('Error loading styles:', error);
//             });
//     }

//     get hasContentVersions() {
//         return this.contentUrls.length > 0;
//     }

//     get hasNoContentVersions() {
//         return this.contentUrls.length === 0;
//     }

//     get showPrevious() {
//         return this.hasContentVersions && this.contentUrls.length > 1 && this.currentImageIndex > 0;
//     }

//     get showNext() {
//         return this.hasContentVersions && this.contentUrls.length > 1 && this.currentImageIndex < this.contentUrls.length - 1;
//     }

//     get disablePrevious() {
//         return !this.showPrevious;
//     }

//     get disableNext() {
//         return !this.showNext;
//     }

//     get currentImageUrl() {
//         return this.contentUrls[this.currentImageIndex];
//     }

//     getUrlForContentVersion(contentVersionId) {
//         return `/sfc/servlet.shepherd/version/download/${contentVersionId}`;
//     }

//     showPreviousImage() {
//         if (this.showPrevious) {
//             this.currentImageIndex -= 1;
//         }
//     }

//     showNextImage() {
//         if (this.showNext) {
//             this.currentImageIndex += 1;
//         }
//     }
// }


import { LightningElement, wire, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import displayImageLWCStyles from '@salesforce/resourceUrl/displayImageLWCStyles';
import getContentVersions from '@salesforce/apex/DisplayImageController.getContentVersions';

export default class DisplayImageLWC extends LightningElement {
    @api recordId; // This will hold the Property__c record Id
    contentUrls = []; // Array to store the image URLs
    currentImageIndex = 0; // Index of the currently displayed image

    @wire(getContentVersions, { propertyId: '$recordId' })
    contentVersions({ error, data }) {
        if (data) {
            this.contentUrls = data.map(contentVersion => this.getUrlForContentVersion(contentVersion.Id));
        } else if (error) {
            console.error('Error fetching content versions:', error);
        }
    }

    renderedCallback() {
        // Load the CSS styles from the static resource
        loadStyle(this, displayImageLWCStyles)
            .catch(error => {
                console.error('Error loading styles:', error);
            });
    }

    get hasContentVersions() {
        return this.contentUrls.length > 0;
    }

    get hasNoContentVersions() {
        return this.contentUrls.length === 0;
    }

    get showPrevious() {
        return this.hasContentVersions && this.contentUrls.length > 1;
    }

    get showNext() {
        return this.hasContentVersions && this.contentUrls.length > 1;
    }

    get currentImageUrl() {
        return this.contentUrls[this.currentImageIndex];
    }

     getUrlForContentVersion(contentVersionId) {
        return `/sfc/servlet.shepherd/version/download/${contentVersionId}`;
    }

    handleImageClick(event) {
        const index = event.currentTarget.dataset.index;
        if (index !== undefined) {
            this.currentImageIndex = parseInt(index, 10);
        }
    }

    navigate(direction) {
        const totalImages = this.contentUrls.length;
        if (totalImages > 1) {
            if (direction === 'next') {
                this.currentImageIndex = (this.currentImageIndex + 1) % totalImages;
            } else if (direction === 'previous') {
                this.currentImageIndex = (this.currentImageIndex - 1 + totalImages) % totalImages;
            }
        }
    }

    showPreviousImage() {
        this.navigate('previous');
    }

    showNextImage() {
        this.navigate('next');
    }
}

