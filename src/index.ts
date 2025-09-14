import { ReportGenerator } from "./report-generator";

(async () => {
    try {
      const reportGenerator = new ReportGenerator();
      const report = await reportGenerator.generateReport();
      console.log(JSON.stringify(report,null,2));
    } catch (error) {
      console.error(`[Error] ${(error as Error).message}`);
    }
})();