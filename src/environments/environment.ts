// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api: "http://localhost:5001/api/", //ang kaning environment mura rasad nig kani
  avatar_url: "http://localhost:5001/images/avatar/",
  buildingpermit_url: "http://localhost:5001/attachments/building-permit/",
  blueprint_url: "http://localhost:5001/attachments/blueprint/",
  paymentReceipt_url: "http://localhost:5001/payments/joborder-invoice/",
  contract_url: "http://localhost:5001/joborder/contracts/",
  resume_url: "http://localhost:5001/attachments/resume/",
  certificate_url:"http://localhost:5001/attachments/certificate/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
