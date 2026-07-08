const dns = require("node:dns").promises;
 
(async () => {

  try {

    console.log("Testando resolveSrv...");

    const result = await dns.resolveSrv(

      "_mongodb._tcp.cluster0.ywdj48w.mongodb.net"

    );

    console.log(result);

  } catch (err) {

    console.error(err);

  }

})();
 