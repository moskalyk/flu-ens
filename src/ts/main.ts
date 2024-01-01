/* eslint-disable */
// @ts-nocheck
/**
 *
 * This file is generated using:
 * @fluencelabs/aqua-api version: 0.12.0
 * @fluencelabs/aqua-to-js version: 0.1.0
 * If you find any bugs in generated AIR, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * If you find any bugs in generated JS/TS, please write an issue on GitHub: https://github.com/fluencelabs/js-client/issues
 *
 */
import type { IFluenceClient as IFluenceClient$$, CallParams as CallParams$$ } from '@fluencelabs/js-client';

import {
    v5_callFunction as callFunction$$,
    v5_registerService as registerService$$,
} from '@fluencelabs/js-client';

// Services
export interface ENSServiceDef {
    route: (ens: string, callParams: CallParams$$<'ens'>) => string | Promise<string>;
}
export function registerENSService(service: ENSServiceDef): void;
export function registerENSService(serviceId: string, service: ENSServiceDef): void;
export function registerENSService(peer: IFluenceClient$$, service: ENSServiceDef): void;
export function registerENSService(peer: IFluenceClient$$, serviceId: string, service: ENSServiceDef): void;
export function registerENSService(...args: any[]) {
    registerService$$(
        args,
        {
    "defaultServiceId": "ensService",
    "functions": {
        "fields": {
            "route": {
                "domain": {
                    "fields": {
                        "ens": {
                            "name": "string",
                            "tag": "scalar"
                        }
                    },
                    "tag": "labeledProduct"
                },
                "codomain": {
                    "items": [
                        {
                            "name": "string",
                            "tag": "scalar"
                        }
                    ],
                    "tag": "unlabeledProduct"
                },
                "tag": "arrow"
            }
        },
        "tag": "labeledProduct"
    }
}
    );
}

export interface ERC721ServiceDef {
    greet: (callParams: CallParams$$<null>) => string | Promise<string>;
}
export function registerERC721Service(service: ERC721ServiceDef): void;
export function registerERC721Service(serviceId: string, service: ERC721ServiceDef): void;
export function registerERC721Service(peer: IFluenceClient$$, service: ERC721ServiceDef): void;
export function registerERC721Service(peer: IFluenceClient$$, serviceId: string, service: ERC721ServiceDef): void;
export function registerERC721Service(...args: any[]) {
    registerService$$(
        args,
        {
    "defaultServiceId": "erc721Service",
    "functions": {
        "fields": {
            "greet": {
                "domain": {
                    "tag": "nil"
                },
                "codomain": {
                    "items": [
                        {
                            "name": "string",
                            "tag": "scalar"
                        }
                    ],
                    "tag": "unlabeledProduct"
                },
                "tag": "arrow"
            }
        },
        "tag": "labeledProduct"
    }
}
    );
}


// Functions
export const routeGreet_script = `
(xor
 (seq
  (seq
   (seq
    (seq
     (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
     (call %init_peer_id% ("getDataSrv" "ens") [] -ens-arg-)
    )
    (call %init_peer_id% ("getDataSrv" "peer") [] -peer-arg-)
   )
   (new $device
    (new $res
     (seq
      (seq
       (seq
        (xor
         (seq
          (seq
           (seq
            (new $-ephemeral-stream-
             (new #-ephemeral-canon-
              (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
             )
            )
            (call -peer-arg- ("ensService" "route") [-ens-arg-] ret)
           )
           (ap ret $device)
          )
          (new $-ephemeral-stream-
           (new #-ephemeral-canon-
            (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
           )
          )
         )
         (seq
          (seq
           (new $-ephemeral-stream-
            (new #-ephemeral-canon-
             (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
            )
           )
           (new $-ephemeral-stream-
            (new #-ephemeral-canon-
             (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
            )
           )
          )
          (fail :error:)
         )
        )
        (new $device_test
         (seq
          (seq
           (fold $device device_fold_var
            (seq
             (seq
              (ap device_fold_var $device_test)
              (canon %init_peer_id% $device_test  #device_iter_canon)
             )
             (xor
              (match #device_iter_canon.length 1
               (null)
              )
              (next device_fold_var)
             )
            )
            (never)
           )
           (canon %init_peer_id% $device_test  #device_result_canon)
          )
          (ap #device_result_canon device_gate)
         )
        )
       )
       (xor
        (seq
         (seq
          (seq
           (new $-ephemeral-stream-
            (new #-ephemeral-canon-
             (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
            )
           )
           (call device_gate.$.[0] ("erc721Service" "greet") [] ret-0)
          )
          (ap ret-0 $res)
         )
         (new $-ephemeral-stream-
          (new #-ephemeral-canon-
           (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
          )
         )
        )
        (seq
         (seq
          (new $-ephemeral-stream-
           (new #-ephemeral-canon-
            (canon -relay- $-ephemeral-stream-  #-ephemeral-canon-)
           )
          )
          (new $-ephemeral-stream-
           (new #-ephemeral-canon-
            (canon %init_peer_id% $-ephemeral-stream-  #-ephemeral-canon-)
           )
          )
         )
         (fail :error:)
        )
       )
      )
      (new $res_test
       (seq
        (seq
         (fold $res res_fold_var
          (seq
           (seq
            (ap res_fold_var $res_test)
            (canon %init_peer_id% $res_test  #res_iter_canon)
           )
           (xor
            (match #res_iter_canon.length 1
             (null)
            )
            (next res_fold_var)
           )
          )
          (never)
         )
         (canon %init_peer_id% $res_test  #res_result_canon)
        )
        (ap #res_result_canon res_gate)
       )
      )
     )
    )
   )
  )
  (call %init_peer_id% ("callbackSrv" "response") [res_gate.$.[0]])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [:error: 0])
)
`;

export function routeGreet(
    ens: string,
    peer: string,
    config?: {ttl?: number}
): Promise<string>;

export function routeGreet(
    peer: IFluenceClient$$,
    ens: string,
    peer: string,
    config?: {ttl?: number}
): Promise<string>;

export function routeGreet(...args: any[]) {
    return callFunction$$(
        args,
        {
    "functionName": "routeGreet",
    "arrow": {
        "domain": {
            "fields": {
                "ens": {
                    "name": "string",
                    "tag": "scalar"
                },
                "peer": {
                    "name": "string",
                    "tag": "scalar"
                }
            },
            "tag": "labeledProduct"
        },
        "codomain": {
            "items": [
                {
                    "name": "string",
                    "tag": "scalar"
                }
            ],
            "tag": "unlabeledProduct"
        },
        "tag": "arrow"
    },
    "names": {
        "relay": "-relay-",
        "getDataSrv": "getDataSrv",
        "callbackSrv": "callbackSrv",
        "responseSrv": "callbackSrv",
        "responseFnName": "response",
        "errorHandlingSrv": "errorHandlingSrv",
        "errorFnName": "error"
    }
},
        routeGreet_script
    );
}
