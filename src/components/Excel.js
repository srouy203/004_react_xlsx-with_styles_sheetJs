import React from "react";
import * as XLSX from "xlsx";
import * as XlsxPopulate from "xlsx-populate/browser/xlsx-populate";

const Excel = ({ data }) => {
  const createDownLoadData = () => {
    handleExport().then((url) => {
      console.log(url);
      const downloadAnchorNode = document.createElement("a");
      downloadAnchorNode.setAttribute("href", url);
      downloadAnchorNode.setAttribute("download", "student_report.xlsx");
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    });
  };

  const workbook2blob = (workbook) => {
    const wopts = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };

    const wbout = XLSX.write(workbook, wopts);

    // The application/octet-stream MIME type is used for unknown binary files.
    // It preserves the file contents, but requires the receiver to determine file type,
    // for example, from the filename extension.
    const blob = new Blob([s2ab(wbout)], {
      type: "application/octet-stream",
    });

    return blob;
  };

  const s2ab = (s) => {
    // The ArrayBuffer() constructor is used to create ArrayBuffer objects.
    // create an ArrayBuffer with a size in bytes
    const buf = new ArrayBuffer(s.length);

    console.log(buf);

    //create a 8 bit integer array
    const view = new Uint8Array(buf);

    console.log(view);
    //charCodeAt The charCodeAt() method returns an integer between 0 and 65535 representing the UTF-16 code
    for (let i = 0; i !== s.length; ++i) {
      // console.log(s.charCodeAt(i));
      view[i] = s.charCodeAt(i);
    }

    return buf;
  };

  const handleExport = () => {
    const title = [{ A: "Students and Marks details" }, {}];
    let table1 = [
      {
        A: "Enrolment No.",
        B: "លេខរៀង",
        C: "Parent Name",
        D: "Class",
        E: "Subject",
        F: "Division",
        G: "Result Status",
        H: "Result Status",
        I: "Result Status",
      },
    ];

    let table2 = [
      {
        A: "Enrolment No.",
        B: "Student Name",
        C: "Mathematics",
        D: "Physics",
        E: "Chemistry",
        F: "English",
        G: "Computer Science",
        H: "Total",
      },
    ];

    data.forEach((row) => {
      const studentDetails = row.STUDENT_DETAILS;
      const marksDetails = row.MARKS;

      table1.push({
        A: studentDetails.id,
        B: studentDetails.name,
        C: studentDetails.parentName,
        D: studentDetails.classroom,
        E: studentDetails.subject,
        F: studentDetails.division,
        G: studentDetails.status,
      });

      table2.push({
        A: studentDetails.id,
        B: studentDetails.name,
        C: marksDetails.maths,
        D: marksDetails.physics,
        E: marksDetails.chemistry,
        F: marksDetails.english,
        G: marksDetails.computerScience,
        H:
          marksDetails.maths +
          marksDetails.physics +
          marksDetails.chemistry +
          marksDetails.english +
          marksDetails.computerScience,
      });
    });

    table1 = [{ A: "Student Details" }]
      // .concat()
      .concat(table1)
      .concat([""])
      .concat([{ A: "Marks" }])
      .concat(table2);

    const finalData = [...title, ...table1];

    console.log(finalData);

    //create a new workbook
    const wb = XLSX.utils.book_new();

    const sheet = XLSX.utils.json_to_sheet(finalData, {
      skipHeader: true,
    });

    XLSX.utils.book_append_sheet(wb, sheet, "student_report");

    // binary large object
    // Since blobs can store binary data, they can be used to store images or other multimedia files.
    console.log(wb);
    const workbookBlob = workbook2blob(wb);

    var headerIndexes = [];
    finalData.forEach((data, index) =>
      data["A"] === "Enrolment No." ? headerIndexes.push(index) : null
    );

    const totalRecords = data.length;

    const dataInfo = {
      titleCell: "A2",
      titleRange: "A1:H2",
      name: "A2:C3",
      tbodyRange: `A3:H${finalData.length}`,

      theadRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:G${headerIndexes[0] + 1}`
          : null,
      theadRange1:
        headerIndexes?.length >= 2
          ? `A${headerIndexes[1] + 1}:H${headerIndexes[1] + 1}`
          : null,
      tFirstColumnRange:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[0] + 1}:A${totalRecords + headerIndexes[0] + 1}`
          : null,
      tLastColumnRange:
        headerIndexes?.length >= 1
          ? `G${headerIndexes[0] + 1}:G${totalRecords + headerIndexes[0] + 1}`
          : null,

      tFirstColumnRange1:
        headerIndexes?.length >= 1
          ? `A${headerIndexes[1] + 1}:A${totalRecords + headerIndexes[1] + 1}`
          : null,
      tLastColumnRange1:
        headerIndexes?.length >= 1
          ? `H${headerIndexes[0] + 1}:H${totalRecords + headerIndexes[1] + 1}`
          : null,
    };

    return addStyle(workbookBlob, dataInfo);
  };

  const addStyle = (workbookBlob, dataInfo) => {
    return XlsxPopulate.fromDataAsync(workbookBlob).then((workbook) => {
      console.log(workbook);
      workbook.sheets().forEach((sheet) => {
        console.log(sheet);
        sheet.usedRange().style({
          fontFamily: "Khmer OS Content",
          verticalAlignment: "center",
        });
        console.log(sheet.column("A"));
        sheet.column("A").width(20);
        sheet.column("B").width(15);
        sheet.column("C").width(15);
        sheet.column("E").width(15);
        sheet.column("G").width(15);

        sheet.range(dataInfo.titleRange).merged(true).style({
          bold: true,
          horizontalAlignment: "center",
          verticalAlignment: "center",
        });

        if (dataInfo.tbodyRange) {
          sheet.range(dataInfo.tbodyRange).style({
            horizontalAlignment: "center",
          });
        }

        sheet.range(dataInfo.theadRange).style({
          fill: "FFFFFF",
          bold: true,
          horizontalAlignment: "center",
        });

        if (dataInfo.theadRange1) {
          sheet.range(dataInfo.theadRange1).style({
            fill: "808080",
            bold: true,
            horizontalAlignment: "center",
            fontColor: "ffffff",
          });
        }

        if (dataInfo.tFirstColumnRange) {
          sheet.range(dataInfo.tFirstColumnRange).style({
            bold: true,
          });
        }

        if (dataInfo.tLastColumnRange) {
          sheet.range(dataInfo.tLastColumnRange).style({
            bold: true,
          });
        }

        if (dataInfo.tFirstColumnRange1) {
          sheet.range(dataInfo.tFirstColumnRange1).style({
            bold: true,
          });
        }

        if (dataInfo.tLastColumnRange1) {
          sheet.range(dataInfo.tLastColumnRange1).style({
            bold: true,
          });
        }
      });

      return workbook
        .outputAsync()
        .then((workbookBlob) => URL.createObjectURL(workbookBlob));
    });
  };

  return (
    <button
      onClick={() => {
        createDownLoadData();
      }}
      className="btn btn-secondary float-start">
      Export Excel
    </button>
  );
};

export default Excel;
