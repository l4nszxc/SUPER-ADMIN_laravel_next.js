<?php

return [
    'sanctum' => [
        'stateful' => explode(',', env('SANCTUM_STATEFUL_DOMAINS', 'localhost,127.0.0.1')),
        'guard' => ['web'],
        'expiration' => null,
    ],
];
