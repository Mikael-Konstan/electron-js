#!/bin/bash
path='D:/work/20220331_test/asset/erp/product/aefetch'
all="false"
if [[ $1 ]]
then path=$1
fi
if [[ $2 ]]
then all=$2
fi

# echo $path
# echo $all

cd $path

if [[ $all == "false" ]] 
then
    grunt dev
else
    for file in *;
    do
        if [[ -d $file ]]
        then
            # echo $file
            cd $file && grunt dev && cd ..
        fi
    done
fi

# exec /bin/bash
