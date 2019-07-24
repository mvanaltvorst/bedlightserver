FROM arm32v6/golang:alpine

LABEL maintainer="Maurits van Altvorst <mvanaltvorst@icloud.com>"
ENV GO111MODULE=on

WORKDIR /go/src/github.com/mvanaltvorst/bedlightserver

RUN apk add --no-cache git

COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["/go/bin/app"]
