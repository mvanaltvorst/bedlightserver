FROM golang:alpine

LABEL maintainer="Maurits van Altvorst <mvanaltvorst@icloud.com>"
ENV GO111MODULE=on

WORKDIR /go/src/github.com/mvanaltvorst/bedlightserver
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["./app/app"]
