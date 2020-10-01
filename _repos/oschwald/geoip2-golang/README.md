"# GeoIP2 Reader for Go #\n\n[![GoDoc](https://godoc.org/github.com/oschwald/geoip2-golang?status.svg)](https://godoc.org/github.com/oschwald/geoip2-golang)\n\nThis library reads MaxMind [GeoLite2](http://dev.maxmind.com/geoip/geoip2/geolite2/)\nand [GeoIP2](http://www.maxmind.com/en/geolocation_landing) databases.\n\nThis library is built using\n[the Go maxminddb reader](https://github.com/oschwald/maxminddb-golang).\nAll data for the database record is decoded using this library. If you only\nneed several fields, you may get superior performance by using maxminddb's\n`Lookup` directly with a result struct that only contains the required fields.\n(See [example_test.go](https://github.com/oschwald/maxminddb-golang/blob/master/example_test.go)\nin the maxminddb repository for an example of this.)\n\n## Installation ##\n\n```\ngo get github.com/oschwald/geoip2-golang\n```\n\n## Usage ##\n\n[See GoDoc](http://godoc.org/github.com/oschwald/geoip2-golang) for\ndocumentation and examples.\n\n## Example ##\n\n```go\npackage main\n\nimport (\n\t\"fmt\"\n\t\"github.com/oschwald/geoip2-golang\"\n\t\"log\"\n\t\"net\"\n)\n\nfunc main() {\n\tdb, err := geoip2.Open(\"GeoIP2-City.mmdb\")\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tdefer db.Close()\n\t// If you are using strings that may be invalid, check that ip is not nil\n\tip := net.ParseIP(\"81.2.69.142\")\n\trecord, err := db.City(ip)\n\tif err != nil {\n\t\tlog.Fatal(err)\n\t}\n\tfmt.Printf(\"Portuguese (BR) city name: %v\\n\", record.City.Names[\"pt-BR\"])\n\tif len(record.Subdivisions) > 0 {\n\t\tfmt.Printf(\"English subdivision name: %v\\n\", record.Subdivisions[0].Names[\"en\"])\n\t}\n\tfmt.Printf(\"Russian country name: %v\\n\", record.Country.Names[\"ru\"])\n\tfmt.Printf(\"ISO country code: %v\\n\", record.Country.IsoCode)\n\tfmt.Printf(\"Time zone: %v\\n\", record.Location.TimeZone)\n\tfmt.Printf(\"Coordinates: %v, %v\\n\", record.Location.Latitude, record.Location.Longitude)\n\t// Output:\n\t// Portuguese (BR) city name: Londres\n\t// English subdivision name: England\n\t// Russian country name: \u0412\u0435\u043b\u0438\u043a\u043e\u0431\u0440\u0438\u0442\u0430\u043d\u0438\u044f\n\t// ISO country code: GB\n\t// Time zone: Europe/London\n\t// Coordinates: 51.5142, -0.0931\n}\n```\n\n## Testing ##\n\nMake sure you checked out test data submodule:\n\n```\ngit submodule init\ngit submodule update\n```\n\nExecute test suite:\n\n```\ngo test\n```\n\n## Contributing ##\n\nContributions welcome! Please fork the repository and open a pull request\nwith your changes.\n\n## License ##\n\nThis is free software, licensed under the ISC license.\n"