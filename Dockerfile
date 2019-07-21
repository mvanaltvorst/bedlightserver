FROM golang:buster

LABEL maintainer="Maurits van Altvorst <mvanaltvorst@icloud.com>"

WORKDIR /go/src/github.com/mvanaltvorst/bedlightserver
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

CMD ["bedlightserver"]
